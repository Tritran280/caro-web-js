// tạo uid ván game
class IDGenerator
{
    static generateUid()
    {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uid = '';
        for (let i = 0; i < 15; i++)
        {
            uid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return uid;
    }
    
    // tạo id
    static generateId()
    {
        const characters = '123456789';
        let id = '';
        for (let i = 0; i < 6; i++)
        {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    }
}
