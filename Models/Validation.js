function Validation () {

    this.kiemTraRong = function (value, selectorError, name){
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraSo = function (value, selectorError, name){
        var regexAllNumber = /^[0-9]+$/;
        if(regexAllNumber.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số !';
        return false;
    }

    this.kiemTraChu = function (value, selectorError, name) {
        var regexAllLetter = /^[A-Z a-z]+$/;
        if(regexAllLetter.test(value)){
            document.querySelector(selectorError).innerHTML = ''; 
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là kí tự !';
        return false;
    }

    this.kiemTraDoDai = function(value, selectorError, minLength, maxLength, name) {
        if(value.length < minLength || value.length > maxLength){
            document.querySelector(selectorError).innerHTML = 
            `${name} phải từ ${minLength} đến ${maxLength} ký tự !`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function(value, selectorError, minValue, maxValue, name) {
        if(value < minValue || value > maxValue){
            document.querySelector(selectorError).innerHTML = 
            `${name} phải từ ${minValue} đến ${maxValue}`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}