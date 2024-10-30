-- Project Table
CREATE TABLE Project (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    coverPhotoUrl VARCHAR(255),
    technicalDetailsVideo VARCHAR(255),
    linkedDocs TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ProjectFeature Table
CREATE TABLE ProjectFeature (
    id SERIAL PRIMARY KEY,
    projectId UUID REFERENCES Project(id) ON DELETE CASCADE,
    featureName VARCHAR(255) NOT NULL
);

-- Adding an index to optimize queries by projectId
CREATE INDEX idx_projectFeature_projectId ON ProjectFeature(projectId);

-- ImprovementArea Table
CREATE TABLE ImprovementArea (
    id SERIAL PRIMARY KEY,
    projectId UUID REFERENCES Project(id) ON DELETE CASCADE,
    areaName VARCHAR(255) NOT NULL
);

-- Adding an index to optimize queries by projectId
CREATE INDEX idx_improvementArea_projectId ON ImprovementArea(projectId);

-- DevelopmentStack Table
CREATE TABLE DevelopmentStack (
    id SERIAL PRIMARY KEY,
    projectId UUID REFERENCES Project(id) ON DELETE CASCADE,
    stackName VARCHAR(255) NOT NULL
);

-- Adding an index to optimize queries by projectId
CREATE INDEX idx_developmentStack_projectId ON DevelopmentStack(projectId);

-- User Table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    profilePicture VARCHAR(255),
    position VARCHAR(255)
);

-- Adding an index to optimize queries by email
CREATE INDEX idx_user_email ON "User"(email);

-- DemoRequest Table
CREATE TABLE DemoRequest (
    id SERIAL PRIMARY KEY,
    projectId UUID REFERENCES Project(id) ON DELETE SET NULL,
    fullName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    requestDate DATE NOT NULL,
    requestTime TIME NOT NULL,
    comments TEXT,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Adding indices to optimize queries by projectId and status
CREATE INDEX idx_demoRequest_projectId ON DemoRequest(projectId);
CREATE INDEX idx_demoRequest_status ON DemoRequest(status);
