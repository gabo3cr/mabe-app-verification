export const utils = {

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    },
      
    formatDate(date: Date) {
        return (
          [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            (date.getDate()).toString().padStart(2, '0'),
          ].join('-') +
          ' ' +
          [
            (date.getHours()).toString().padStart(2, '0'),
            (date.getMinutes()).toString().padStart(2, '0'),
            (date.getSeconds()).toString().padStart(2, '0'),
          ].join(':')
        );
    }
}

