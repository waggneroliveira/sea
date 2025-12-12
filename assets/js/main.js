(function() {
  "use strict";

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Máscara de telefone
   */
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 0) value = '(' + value;
      if (value.length > 3) value = value.slice(0, 3) + ') ' + value.slice(3);
      if (value.length > 10) value = value.slice(0, 10) + '-' + value.slice(10);

      e.target.value = value;
    });
  }

  /**
   * Scroll Top Button
   */
  let scrollTopBtn = document.querySelector(".scroll-top");
  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  document.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;
    window.scrollY > 100 ? scrollTopBtn.classList.add("active") : scrollTopBtn.classList.remove("active");
  });

  /**
   * Envio dos formulários para WhatsApp
   */
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const data = new FormData(form);
      let message = "";

      const labels = {
        nome: "Nome",
        name: "Nome",
        email: "E-mail",
        telefone: "Telefone",
        phone: "Telefone",
        condominio: "Condomínio",
        condominium: "Condomínio",
        mensagem: "Mensagem",
        message: "Mensagem"
      };

      // Campos ignorados
      const ignoreFields = ["term_privacy", "privacy", "lgpd", "terms"];

      for (const [key, value] of data.entries()) {
        if (value.trim() !== "" && !ignoreFields.includes(key)) {
          message += `${labels[key] || key}: ${value}\n`;
        }
      }

      const url = `https://wa.me/557192490944?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      form.reset();
    });
  });

})();
