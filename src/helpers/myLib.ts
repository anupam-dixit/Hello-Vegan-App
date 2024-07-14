export const myLib = {
  auth:{
    get:function () {
      return JSON.parse(localStorage.getItem('userData'));
    },
    is:function () {
      return (localStorage.getItem('userData')!==null&&localStorage.getItem('userData')!=='')
    }
  },
  toBase64: file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  }),
  fileExtension:function (file :File):string{
    const name = file.name;
    const lastDot = name.lastIndexOf('.');
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    return ext
  }
};
