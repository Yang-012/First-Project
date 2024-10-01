
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // 如果 Local Storage 中沒有數據，返回空陣列
    const cartListElement = document.querySelector('.shopCart__list'); // 找到商品清單的容器
    const subTotalElement = document.getElementById('subTotal'); // 找到顯示總價的容器
    const totalPriceElement = document.getElementById('totalPrice'); // 找到顯示最終價格的容器

    cartListElement.innerHTML = '';


    if (cart.length === 0) {
        cartListElement.innerHTML = '<p>購物車是空的</p>';
        subTotalElement.innerText = '0';
        totalPriceElement.innerText = '0';
        return;
    }


    let subTotal = 0;

    cart.forEach(item => {
        const productItem = document.createElement('div');
        productItem.classList.add('shopCart__item');
        productItem.innerHTML = `
        <h4>${item.name}&nbsp;$${item.price}</h4>
<p style="font-size: 3rem;margin-top: 3rem;"><i class="fas fa-times"></i>&nbsp;${item.quantity}</p>
<p>$${item.price * item.quantity}</p>

      `;


        cartListElement.appendChild(productItem);

        subTotal += parseFloat(item.price * item.quantity);
    });

    // 更新總價顯示
    subTotalElement.innerText = subTotal.toFixed(2); // 總價保留兩位小數
    totalPriceElement.innerText = subTotal.toFixed(2); // 最終總價
}

// 頁面加載完成後顯示購物車內容
document.addEventListener('DOMContentLoaded', renderCart);
