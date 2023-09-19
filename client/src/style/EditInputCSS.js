import styled from "@emotion/styled";

const EditForm = styled.form`
text-align: center;
width: 60%;
height: 100px;
margin: 60px auto 30px;
background-color: #ebebeb;
border-radius: 5px 0px 5px 5px;
padding: 10px;
text-align: end;
transform: translateY(-5px);
input{
  outline:none;
  border:none;
  position:absolute;
  right:0px;
  bottom:100%;
  padding:5px;
  background-color: rgba(243, 246, 205, 0.7);
}
textarea {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 70%;
}

.buttons {

  display:flex;
  justify-content:end;

  button {
    &:first-child {
      background-color: #f4dcdc;
    }
    &:last-child {
      background-color: #e3daeb;
    }
    &:active   {
     filter:brightness(80%);
    }
  }
`

export default EditForm