
export const GenerateReferralCode = () => {
    const obj = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const seperateobj = obj.split('');
    let referral = '';
    for (let i = 0; i < 15; i++) {
        referral += seperateobj[Math.floor(Math.random() * seperateobj.length)];
    }
    const date = new Date().getFullYear();
    return `NV-${referral}-${date}`;
}
