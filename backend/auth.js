import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

const pool = new pg.Pool({
    user: process.env.REMOTE_DB_USER,
    host: process.env.REMOTE_DB_HOST,
    database: process.env.REMOTE_DB_DATABASE,
    password: process.env.REMOTE_DB_PASSWORD,
    port: process.env.REMOTE_DB_PORT
});

const callbackURL = process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CALLBACK_URL_PROD : process.env.GOOGLE_CALLBACK_URL_DEV;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    const client = await pool.connect();
    try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const profilePicture = profile.photos[0].value;
        const role = 'admin'; // Assuming the authenticated user is the admin
        const position = 'Admin'; // You can set this to any default value

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
