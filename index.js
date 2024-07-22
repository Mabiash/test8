const querySelectAll = (attr_name) => document.querySelectorAll(attr_name);
const querySelectOne = (attr_name) => document.querySelector(attr_name);
let aTags = querySelectAll("a");
AOS.init({
  duration:700,
  once: true
});
// humberger menu ==============================================================
const humberger_menu = querySelectOne(".hambergerMenu");
const nav_container = querySelectOne(".navigationContainer");
let isToogle = true;
humberger_menu.addEventListener("click", () => {
  isToogle = !isToogle;
  isToogle
    ? nav_container.classList.remove("nav-toogle")
    : nav_container.classList.add("nav-toogle");
});

document.addEventListener("click", (e) => {
  if (
    e.target.className != "nav-links d-flex" &&
    e.target.classList != "fa-solid fa-bars" &&
    e.target.className != "navigationContainer nav-toogle"
  ) {
    nav_container.classList.remove("nav-toogle");
    isToogle = !isToogle;
  }
});

// CV downlaod ========================================================================
const download_CV = querySelectAll(".downLoadCv");
let createdaTag = document.createElement("a");
download_CV.forEach((dl_button) => {
 
  dl_button.addEventListener("click", () => {
    createdaTag.href = "./images/DarylBacongco-CV.pdf";
    createdaTag.download = "DarylBacongco-CV";
    createdaTag.click();
  });
});

// gt in touch =================================================================

let get_in_touch = querySelectOne(".get-in-touch");

get_in_touch.addEventListener("click", () => {
  createdaTag.href = "mailto:bacongcodaryl@gmail.com?subject=Greetings!%20We%20Look%20Forward%20to%20Your%20Message";
  createdaTag.click();
  
})
// current page ===============================================================

const updateNavbar = () => {
  const sections = querySelectAll("main section");
  const navLinks = querySelectAll("header a");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    window.scrollY >= sectionTop
      ? (currentSection = section.getAttribute("id"))
      : null;
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    link.getAttribute("href") === `#${currentSection}`
      ? link.classList.add("active")
      : null;
  });
}



window.addEventListener("scroll", updateNavbar);
updateNavbar();

// message me ==============================================================

const sendEmail = async () => {
  let sent_verify = querySelectOne(".email-sent-ver");
  let name_ipt = document.getElementById("ipt-name");
  let email_ipt = document.getElementById("ipt-email");
  let message_ipt = document.getElementById("ipt-message");

  if (email_ipt.value != "" && message_ipt.value != "") {
    let param = {
      name: name_ipt.value,
      email: email_ipt.value,
      message: message_ipt.value,
    };

    try {
      name_ipt.value = "";
      email_ipt.value = "";
      message_ipt.value = "";

      await emailjs.send("service_caae0pj", "template_aeywzmt", param);
      sent_verify.style.display = "block";
      sent_verify.innerHTML = `Hello ${param.name}, your message has been successfully sent!`;

      setTimeout(() => {
        sent_verify.style.display = "none";
      }, 10000);
    } catch (error) {
      sent_verify.style.display = "block";
      sent_verify.style.color = "red";
      sent_verify.innerHTML = `Hello ${param.name}, your message could not be sent. Please try again later.`;
    }
  }
};
