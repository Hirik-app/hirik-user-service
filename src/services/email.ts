class EmailService {
    constructor(env?: any) {
        console.log('📧 Mock Email Service initialized');
    }

    async sendRecruiterVerificationEmail(to: string, token: string) {
        const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
        
        console.log('📧 MOCK EMAIL - Recruiter Verification');
        console.log('='.repeat(50));
        console.log(`To: ${to}`);
        console.log(`Subject: Verify your email address`);
        console.log(`Verification Link: ${verificationLink}`);
        console.log('='.repeat(50));
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ Mock verification email sent successfully');
    }

    async sendRecruiterOtpEmail(to: string, otp: string) {
        console.log('📧 MOCK EMAIL - OTP Verification');
        console.log('='.repeat(50));
        console.log(`To: ${to}`);
        console.log(`Subject: Your Hirik Email Verification Code`);
        console.log(`OTP Code: ${otp}`);
        console.log('Message: Your email verification code is: ' + otp);
        console.log('This code will expire in 10 minutes.');
        console.log('='.repeat(50));
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ Mock OTP email sent successfully');
    }
}

export default EmailService;
