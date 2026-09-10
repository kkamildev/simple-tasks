
type EmailVerification = {
    email:string,
    code:string,
    expirationDate:Date,
    verified:boolean
}

let emailVerifications : EmailVerification[] = [];

export const getEmailVerifications = () => emailVerifications;
export const setEmailVerifications = (newData : EmailVerification[]) => emailVerifications = newData;