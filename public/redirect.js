document.addEventListener("DOMContentLoaded", function() {
    console.log("📢 Formularz załadowany, próbuję wysłać...");
    const form = document.getElementById("hotpay-form");
  
    form.onsubmit = function() {
      console.log("📢 Formularz został wysłany!");
    };
  
    setTimeout(() => {
      console.log("📢 Wysyłam formularz...");
      form.submit();
    }, 1000); // Czekamy sekundę, żeby upewnić się, że strona się załadowała
  });
  