export default {
    getCommandFromString: function (str: string, prefix = '!'): string|null {
        if (str[0] !== prefix) return null;
        const separatorPos = str.indexOf(' ');
        return separatorPos > 0 ? str.slice(0, separatorPos) : str;
    }
};
