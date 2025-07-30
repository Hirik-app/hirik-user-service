-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecruiterProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "companyId" TEXT,
    "jobRoleId" TEXT,
    "workEmail" TEXT,
    "location" JSONB,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "recruiterVerificationMethodsId" TEXT,
    "verifiedBy" TEXT,
    "verificationDetails" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecruiterVerificationMethods" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,

    CONSTRAINT "RecruiterVerificationMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobRoleId" TEXT,
    "fullName" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "location" JSONB,
    "expectedSalary" TEXT,
    "yearsOfExperience" TEXT,
    "availableToStart" TEXT,
    "immediateJoiner" BOOLEAN,
    "preferredRole" TEXT,
    "profilePicture" JSONB,
    "cvLink" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobUserMap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobUserMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."saved_jobs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skill_user_map" (
    "id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skill_user_map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."education" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" JSONB,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "grade" TEXT,
    "description" TEXT,
    "isCurrent" BOOLEAN NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."experience" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "jobRoleId" TEXT,
    "companyId" TEXT NOT NULL,
    "location" JSONB,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "isCurrent" BOOLEAN NOT NULL,
    "rolesAndResponsibilities" TEXT,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobMatches" BOOLEAN NOT NULL DEFAULT true,
    "applications" BOOLEAN NOT NULL DEFAULT true,
    "interviews" BOOLEAN NOT NULL DEFAULT true,
    "messages" BOOLEAN NOT NULL DEFAULT true,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "pushEnabled" BOOLEAN NOT NULL DEFAULT true,
    "quietHours" JSONB,
    "frequency" TEXT NOT NULL DEFAULT 'immediate',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_search_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "desiredJobTypes" TEXT[],
    "minSalary" INTEGER,
    "maxSalary" INTEGER,
    "salaryCurrency" TEXT NOT NULL DEFAULT 'USD',
    "salaryPeriod" TEXT NOT NULL DEFAULT 'yearly',
    "desiredLocations" JSONB,
    "isRemoteOnly" BOOLEAN NOT NULL DEFAULT false,
    "isWillingToRelocate" BOOLEAN NOT NULL DEFAULT false,
    "maxCommuteMiles" INTEGER,
    "desiredRoles" TEXT[],
    "desiredSkills" TEXT[],
    "yearsOfExperience" TEXT,
    "desiredIndustries" TEXT[],
    "minCompanySize" INTEGER,
    "maxCompanySize" INTEGER,
    "excludedCompanies" TEXT[],
    "isSearchActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSearchDate" TIMESTAMP(3),
    "savedSearches" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_search_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fcm_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fcm_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."otps" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_countryCode_key" ON "public"."users"("phoneNumber", "countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "RecruiterProfile_userId_key" ON "public"."RecruiterProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "skill_user_map_skill_id_profile_id_key" ON "public"."skill_user_map"("skill_id", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_preferences_userId_key" ON "public"."notification_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "job_search_preferences_userId_key" ON "public"."job_search_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "fcm_tokens_token_key" ON "public"."fcm_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "otps_phoneNumber_countryCode_key" ON "public"."otps"("phoneNumber", "countryCode");

-- AddForeignKey
ALTER TABLE "public"."RecruiterProfile" ADD CONSTRAINT "RecruiterProfile_recruiterVerificationMethodsId_fkey" FOREIGN KEY ("recruiterVerificationMethodsId") REFERENCES "public"."RecruiterVerificationMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_user_map" ADD CONSTRAINT "skill_user_map_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."education" ADD CONSTRAINT "education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."experience" ADD CONSTRAINT "experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
