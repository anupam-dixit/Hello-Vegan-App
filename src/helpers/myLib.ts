export const myLib = {
  auth:{
    get:function () {
      return JSON.parse(localStorage.getItem('userData'));
    },
    is:function () {
      return (localStorage.getItem('userData')!==null&&localStorage.getItem('userData')!=='')
    }
  },
};
