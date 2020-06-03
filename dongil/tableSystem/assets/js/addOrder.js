import axios from "axios";
const addOrderForm = document.getElementById("jsAddOrder");
const orderList = document.getElementById("jsOrderList");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addOrder = (order) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  orderList.prepend(li); //prepend는 객체를 앞에 추가해주는 것
  increaseNumber();
};

const sendOrder = async (order) => {
  // const orderId = window.location.href.split("/orders/")[1];
  const response = await axios({
    url: "/api/order", // `/api/${orderId}/order`
    method: "POST",
    data: {
      order: order, //comment는 text고 handleSubmit으로 부터 보내진것.
    },
  });
  if (response.status === 200) {
    addOrder(order); //이 댓글이 데이터베이스에 추가되면 addComment하겠다는 의미
  }
};

const handleSubmit = (event) => {
  event.preventDefault(); //event를 막아주는 코드 이유는 새로고침 되길 원하지 않기 때문
  const orderInput = addOrderForm.querySelector("button");
  const order = orderInput.value;
  sendOrder(order);
  orderInput.value = "";
};

function init() {
  addOrderForm.addEventListener("submit", handleSubmit); //폼을 submit하면, handleSubmit을 호출하는 코드
}

if (addOrderForm) {
  init();
}
