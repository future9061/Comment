import styled from "@emotion/styled";

const Form = styled.form`
text-align: center;
width: 60%;
height: 100px;
margin: 0px auto;
background-color: white;
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
button {
  background-color: #f4dcdc;
}
`

export default Form