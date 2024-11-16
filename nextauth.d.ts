import NextAuth, { DefaulSession} from 'next-auth'

declare module 'next-auth'{
    interface Session{
        user: {
            id:string;
            name:string;
            email:string;
            emailVerified?:string;
            role:string;
            image?:string;
        } & DefaulSession['user']
    }
}