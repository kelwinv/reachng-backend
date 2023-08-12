class Utils{
    static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    static isEmailValidFormat(value: string): boolean{
        return this.EMAIL_REGEX.test(value)
    }
}

export {Utils}