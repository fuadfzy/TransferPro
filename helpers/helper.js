class Helper {
    static getPounds(value) {
        const gbp = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',}).format(value);

        return gbp
    }
}

module.exports = Helper