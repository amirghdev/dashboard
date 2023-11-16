module.exports.confirmation = () => {
  let template =
    /*html*/
    `
    <div>
        <center> سلام ادمین عزیز </center><br>
        <p>لطفا عکس زیر را تایید کنید</p><br>
        <img src="cid:image" style="width:100%">
        <a src="http://localhost:3000/Books/confirm/">لینک</a>
    </div>
`;
  return template;
};
