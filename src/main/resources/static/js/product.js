function loadProducts() {
fetch("https://product-service-app.herokuapp.com/products"")
    .then(response => response.json())
    .then(products => {
      var listDiv = document.getElementById("product-list");
 
      if (products.length === 0) {
        listDiv.innerHTML = "<p>No products available.</p>";
        return;
      }
 
      var html = "<ul>";
      for (var i = 0; i < products.length; i++) {
        var p = products[i];
		html += "<li>" +
		p.name  + "- Original Price: $" + p.originalPrice + " " + "Discounted Price: $"  + p.discountedPrice +
		" <button onclick=\"addToOrders('"+p.id + "')\">Order</button>" +
		        "</li>";
      }
      html += "</ul>";
 
      listDiv.innerHTML = html;
    })
    .catch(error => {
      console.error("Error fetching products:", error);
      document.getElementById("product-list").innerHTML =
        "<p style='color:red;'>Failed to load products.</p>";
    });
}
 
function addToOrders(productId) {
fetch("https://order-service-app.herokuapp.com/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId:productId,
            quantity: 1   // default quantity
        })
    })
    .then(response => response.json())
    .then(order => {
        alert(name +" Order placed " );
    })
    .catch(error => {
        console.error("Error placing order:", error);
        alert("Failed to place order");
    });
}
// Load products immediately
loadProducts();


