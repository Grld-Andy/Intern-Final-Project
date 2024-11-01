import passport from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.REMOTE_DB_USER,
    host: process.env.REMOTE_DB_HOST,
    database: process.env.REMOTE_DB_DATABASE,
    password: process.env.REMOTE_DB_PASSWORD,
    port: process.env.REMOTE_DB_PORT
});

const callbackURL = process.env.NODE_ENV === 'production' ? process.env.MICROSOFT_CALLBACK_URL_PROD : process.env.MICROSOFT_CALLBACK_URL_DEV;

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: callbackURL,
    scope: ['user.read']
}, async (accessToken, refreshToken, profile, done) => {
    const client = await pool.connect();
    try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        const name = profile.displayName;
        const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
        const role = 'admin'; // Assuming the authenticated user is the admin
        const position = 'Admin'; // You can set this to any default value

        if (!email) {
            return done(new Error('No email found in Microsoft profile'));
        }

        const result = await client.query(
            'INSERT INTO "User" (email, name, role, profilePicture, position) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, profilePicture = EXCLUDED.profilePicture, position = EXCLUDED.position RETURNING *',
            [email, name, role, profilePicture, position]
        );

        return done(null, result.rows[0]);
    } catch (err) {
        return done(err);
    } finally {
        client.release();
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport;