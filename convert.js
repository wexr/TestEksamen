module.exports = function convert(money){
    this.money = money;
    this.result = function (){
        return (money * 7.46);
    }
    
}
