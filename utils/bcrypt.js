import bcryptjs from 'bcryptjs';
import randomBytes from 'randombytes';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 12;  // Increased salt rounds for stronger hashing
        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed');
    }
};


export const randomBytes_ = async (length) => {
    try {
        const bytes = randomBytes(length);
        return bytes.toString('hex');
    } catch (error) {
        console.error('Error generating random bytes:', error);
        throw new Error('Random bytes generation failed');
    }
}


// compare password
export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcryptjs.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
};
