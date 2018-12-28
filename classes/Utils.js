class Utils {

    // Formata new Date()
    static dateFormat(date){
        
        let dia = Utils.moment(date.getDate());
        let mes = Utils.moment(date.getMonth()+1);
        let horas =  Utils.moment(date.getHours());
        let minutos =  Utils.moment(date.getMinutes());

        return dia+'/'+mes+'/'+date.getFullYear()+' '+horas+':'+minutos;
    }

    static moment(m) {
        if ( m < 10) {
           var x = '0'+m;
            return x;
        }else{
            return m;
        }
     }



}


 