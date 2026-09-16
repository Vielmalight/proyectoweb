// =========================================================
// WIKI HIPOTECARIA CREDIFAMILIA
// JAVASCRIPT PRINCIPAL
// =========================================================


// =========================================================
// 1. DATOS DE LOS PERFILES
// =========================================================

const profiles = {
  asalariado: {
    title: "Asalariados",
    intro: "Trabajadores que acreditan ingresos mediante relación laboral y soportes de nómina.",
    steps: [
      ["01", "Recepción", "Recibir la solicitud y la documentación correspondiente al perfil."],
      ["02", "Validación documental", "Revisar identidad, certificación laboral, desprendibles y vigencias."],
      ["03", "Continuidad laboral", "Verificar antigüedad, continuidad y condiciones del contrato."],
      ["04", "Validación financiera", "Revisar ingresos, endeudamiento, RCI, LTV y demás variables aplicables."],
      ["05", "Radicación", "Con el expediente completo, realizar la radicación formal."]
    ]
  },

  independiente: {
    title: "Independientes",
    intro: "Perfiles que requieren validación de actividad económica, ingresos, continuidad y soportes financieros.",
    steps: [
      ["01", "Recepción", "Recibir solicitud y documentos correspondientes al perfil."],
      ["02", "Actividad económica", "Validar RUT, CIIU, actividad desarrollada y coherencia de la información."],
      ["03", "Soportes financieros", "Revisar extractos, declaraciones, Cámara de Comercio y demás soportes cuando apliquen."],
      ["04", "Continuidad", "Verificar experiencia mínima y continuidad de la actividad."],
      ["05", "Radicación", "Completar la validación y radicar cuando se cumplan las condiciones."]
    ]
  },

  pensionado: {
    title: "Pensionados",
    intro: "Solicitantes cuyos ingresos provienen principalmente de una pensión de vejez o invalidez.",
    steps: [
      ["01", "Recepción", "Recibir solicitud y documentos del solicitante."],
      ["02", "Identificación", "Validar identidad y condición de pensionado."],
      ["03", "Ingresos", "Revisar soporte de pensión y demás ingresos cuando correspondan."],
      ["04", "Condiciones", "Validar edad, capacidad de pago, endeudamiento y demás condiciones."],
      ["05", "Radicación", "Completar la validación y continuar con la radicación."]
    ]
  }
};


// =========================================================
// 2. DATOS DE LA WIKI
// =========================================================

const wiki = {

  estandarizacion: [
    "Estandarización",
    "Unificar los lineamientos de ejecución para que los colaboradores operen bajo los mismos estándares de calidad documental.",
    [
      "Criterios únicos de aceptación y rechazo",
      "Recepción y validación documental",
      "Reducción de reprocesos"
    ]
  ],

  eficiencia: [
    "Eficiencia operativa",
    "Busca reducir tiempos, errores y reprocesos durante la gestión de una solicitud.",
    [
      "Reducir retrabajos",
      "Disminuir tiempos de validación",
      "Aumentar radicaciones correctas desde el primer envío"
    ]
  ],

  leadtime: [
    "Tiempo de ciclo",
    "Periodo de gestión desde la recepción de la solicitud hasta su formalización.",
    [
      "Recepción",
      "Validación",
      "Radicación y formalización"
    ]
  ],

  calidad: [
    "Control de calidad integral",
    "Proceso de revisión que busca garantizar que el expediente cumpla las condiciones requeridas antes de avanzar.",
    [
      "Revisar documentos",
      "Validar perfil",
      "Comprobar información antes de radicar"
    ]
  ],

  mior: [
    "Modelo MIOR",
    "Modelo Integral de Optimización de Radicación Hipotecaria.",
    [
      "Estandarización operativa",
      "Navegación inteligente",
      "Centro de conocimiento",
      "Medición y mejora continua"
    ]
  ],

  lean: [
    "Lean / Poka-Yoke",
    "La propuesta busca prevenir los errores desde el origen antes de que generen devoluciones o reprocesos.",
    [
      "Prevenir errores antes de radicar",
      "Reducir desperdicio por reproceso",
      "Blindar el proceso desde el origen"
    ]
  ]
};


// =========================================================
// 3. FLUJOGRAMAS
// =========================================================

function renderFlow(route = "asalariado") {

  const p = profiles[route];

  if (!p) return;

  const flowIntro = document.getElementById("flowIntro");
  const flow = document.getElementById("flow");

  if (!flowIntro || !flow) return;

  flowIntro.innerHTML =
    `<strong>${p.title}</strong> · ${p.intro}`;

  flow.innerHTML = p.steps
    .map(
      (step) => `
        <div class="flow-node">
          <span class="num">${step[0]}</span>
          <h3>${step[1]}</h3>
          <p>${step[2]}</p>
        </div>
      `
    )
    .join("");
}


// Inicializar flujograma
renderFlow();


// Botones de perfiles del flujograma
document.querySelectorAll(".tab").forEach((button) => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    renderFlow(button.dataset.route);

  });

});


// =========================================================
// 4. CHECKLIST DE RADICACIÓN
// =========================================================

const checks = [
  "Documento de identidad revisado",
  "Certificación laboral vigente cuando aplique",
  "Desprendibles de nómina revisados",
  "Extractos bancarios revisados cuando corresponda",
  "RUT y actividad económica validados para independientes",
  "Cámara de Comercio validada para comerciantes",
  "Declaración de renta verificada cuando aplique",
  "Continuidad laboral revisada",
  "Información del perfil coherente",
  "Expediente listo para radicación"
];


const checkBox = document.getElementById("checkItems");


if (checkBox) {

  checkBox.innerHTML = checks
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" data-check="${index}">
          <span>${item}</span>
        </label>
      `
    )
    .join("");

}


// Actualizar progreso del checklist
function updateCheck() {

  const boxes = [
    ...document.querySelectorAll("[data-check]")
  ];

  if (!boxes.length) return;

  const completed = boxes.filter(
    (box) => box.checked
  ).length;

  const percentage = Math.round(
    (completed / boxes.length) * 100
  );


  const progressText =
    document.getElementById("checkProgress");

  const progressBar =
    document.getElementById("progressBar");

  const resultCircle =
    document.getElementById("resultCircle");

  const resultTitle =
    document.getElementById("resultTitle");

  const resultText =
    document.getElementById("resultText");


  if (progressText) {
    progressText.textContent =
      `${completed} de ${boxes.length} completados`;
  }

  if (progressBar) {
    progressBar.style.width =
      percentage + "%";
  }

  if (resultCircle) {
    resultCircle.textContent =
      percentage + "%";
  }


  if (resultTitle && resultText) {

    if (percentage === 100) {

      resultTitle.textContent =
        "Listo para radicar";

      resultText.textContent =
        "La lista de validación está completa.";

    } else if (percentage >= 70) {

      resultTitle.textContent =
        "Revisión avanzada";

      resultText.textContent =
        "Faltan pocos puntos por verificar.";

    } else if (percentage > 0) {

      resultTitle.textContent =
        "En revisión";

      resultText.textContent =
        "Continúa validando los requisitos.";

    } else {

      resultTitle.textContent =
        "Pendiente de revisión";

      resultText.textContent =
        "Completa la lista para verificar la preparación del expediente.";

    }

  }

}


// Detectar cambios en el checklist
document.addEventListener("change", (event) => {

  if (event.target.matches("[data-check]")) {
    updateCheck();
  }

});


// Botón reiniciar
const resetCheck =
  document.getElementById("resetCheck");


if (resetCheck) {

  resetCheck.addEventListener("click", () => {

    document
      .querySelectorAll("[data-check]")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    updateCheck();

  });

}


updateCheck();


// =========================================================
// 5. SISTEMA DE ACORDEONES
// =========================================================

// Permite utilizar elementos como:
//
// <button class="accordion-btn">
// <div class="accordion-content">
//
// También funciona con:
//
// <details>
// <summary>


document
  .querySelectorAll(".accordion-btn")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const content =
        button.nextElementSibling;

      button.classList.toggle("active");

      if (content) {

        content.classList.toggle("open");

      }

    });

  });


// =========================================================
// 6. BOTONES "VER DETALLE"
// =========================================================

document
  .querySelectorAll("[data-detail]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const targetId =
        button.dataset.detail;

      const target =
        document.getElementById(targetId);

      if (!target) return;

      target.classList.toggle("open");

      button.classList.toggle("active");

      if (target.classList.contains("open")) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });

      }

    });

  });


// =========================================================
// 7. BUSCADOR GENERAL DE LA WIKI
// =========================================================

function normalizeSearchText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const globalSearch =
  document.getElementById("globalSearch");

const searchResults =
  document.getElementById("searchResults");

const initialSearchMarkup =
  searchResults?.innerHTML || "";

function escapeSearchHTML(value = "") {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

const searchableSections = [
  ...document.querySelectorAll("main section[id]:not(#buscador)")
];

function renderGlobalSearch(value = "") {
  if (!searchResults) return;

  const query = normalizeSearchText(value);
  if (!query) {
    searchResults.innerHTML = initialSearchMarkup;
    return;
  }

  const matches = searchableSections.filter((section) =>
    normalizeSearchText(section.innerText).includes(query)
  );

  searchResults.innerHTML = matches.length
    ? `<p class="search-count">${matches.length} ${matches.length === 1 ? "sección encontrada" : "secciones encontradas"}</p>${matches.map((section) => {
        const title = section.querySelector("h2")?.textContent.trim() || "Resultado";
        const excerpt = section.innerText.replace(/\s+/g, " ").trim().slice(0, 180);
        return `<a class="search-result" href="#${section.id}"><span>Ir a la sección</span><strong>${escapeSearchHTML(title)}</strong><p>${escapeSearchHTML(excerpt)}…</p></a>`;
      }).join("")}`
    : `<p class="empty-state search-empty">No encontramos información relacionada con “${escapeSearchHTML(value.trim())}”.</p>`;
}


if (globalSearch) {

  globalSearch.addEventListener("input", (event) => {
    renderGlobalSearch(event.target.value);
  });

  searchResults?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-term]");
    if (!button) return;

    globalSearch.value = button.dataset.searchTerm;
    renderGlobalSearch(globalSearch.value);
    globalSearch.focus();
  });

}


// =========================================================
// 8. BUSCADOR DE DOCUMENTACIÓN
// =========================================================

const docSearch =
  document.getElementById("docSearch");


if (docSearch) {

  docSearch.addEventListener("input", (event) => {

    const query = normalizeSearchText(event.target.value);


    let visible = 0;


    document
      .querySelectorAll(".doc-card")
      .forEach((card) => {

        const searchText = normalizeSearchText(
            card.dataset.search ||
            card.innerText ||
            ""
          );


        const match =
          !query ||
          searchText.includes(query);


        card.style.display =
          match ? "" : "none";


        if (match) {
          visible++;
        }

      });


    const empty =
      document.getElementById("docEmpty");


    if (empty) {

      empty.style.display =
        visible ? "none" : "block";

    }

  });

}


// =========================================================
// 9. WIKI DE CONSULTA RÁPIDA
// =========================================================

function renderWiki(topic = "estandarizacion") {

  const data =
    wiki[topic];

  const content =
    document.getElementById("wikiContent");


  if (!data || !content) return;


  content.innerHTML = `
    <span class="eyebrow">CONCEPTO CLAVE</span>
    <h3>${data[0]}</h3>
    <p>${data[1]}</p>

    <ul>
      ${data[2]
        .map((item) => `<li>${item}</li>`)
        .join("")}
    </ul>
  `;

}


renderWiki();


document
  .querySelectorAll(".wiki-link")
  .forEach((button) => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".wiki-link")
        .forEach((item) => {
          item.classList.remove("active");
        });


      button.classList.add("active");


      renderWiki(
        button.dataset.topic
      );

    });

  });


// =========================================================
// 10. MODALES DE PERFILES
// =========================================================

const modal =
  document.getElementById("profileModal");


document
  .querySelectorAll("[data-open-profile]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const profile =
        profiles[
          button.dataset.openProfile
        ];


      if (!profile || !modal) return;


      const modalContent =
        document.getElementById("modalContent");


      if (!modalContent) return;


      modalContent.innerHTML = `
        <span class="eyebrow">
          RUTA DE VALIDACIÓN
        </span>

        <h2>${profile.title}</h2>

        <p>${profile.intro}</p>

        <ul>
          ${profile.steps
            .map(
              (step) => `
                <li>
                  <strong>${step[1]}:</strong>
                  ${step[2]}
                </li>
              `
            )
            .join("")}
        </ul>
      `;


      modal.classList.add("show");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

    });

  });


// Cerrar modal
function closeModal() {

  if (!modal) return;

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


const closeModalButton =
  document.getElementById("closeModal");


if (closeModalButton) {

  closeModalButton.addEventListener(
    "click",
    closeModal
  );

}


// Cerrar al hacer clic fuera
if (modal) {

  modal.addEventListener(
    "click",
    (event) => {

      if (event.target === modal) {
        closeModal();
      }

    }
  );

}


// Cerrar con ESC
document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);


// =========================================================
// 11. NAVEGACIÓN DE LAS TARJETAS PRINCIPALES
// =========================================================

// Permite usar:
//
// data-section="perfiles"
//
// en botones o tarjetas.


document
  .querySelectorAll("[data-section]")
  .forEach((element) => {

    element.addEventListener(
      "click",
      () => {

        const sectionId =
          element.dataset.section;

        const section =
          document.getElementById(
            sectionId
          );


        if (!section) return;


        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


// =========================================================
// 12. MENÚ MÓVIL
// =========================================================

const menuButton =
  document.getElementById("menuBtn");

const mainNav =
  document.getElementById("mainNav");


if (menuButton && mainNav) {

  menuButton.addEventListener(
    "click",
    () => {

      const isOpen = mainNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");

    }
  );


  mainNav
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "open"
          );
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.setAttribute("aria-label", "Abrir menú");

        }
      );

    });

  document.addEventListener("click", (event) => {
    if (!mainNav.classList.contains("open")) return;
    if (mainNav.contains(event.target) || menuButton.contains(event.target)) return;

    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });

}


// =========================================================
// 13. GLOSARIO
// =========================================================

const glossarySearch =
  document.getElementById(
    "glossarySearch"
  );


if (glossarySearch) {

  glossarySearch.addEventListener(
    "input",
    (event) => {

      const query = normalizeSearchText(event.target.value);


      let visible = 0;


      document
        .querySelectorAll(
          ".glossary-card"
        )
        .forEach((item) => {

          const text = normalizeSearchText(
            item.dataset.term || item.innerText
          );


          const match =
            !query ||
            text.includes(query);


          item.style.display =
            match ? "" : "none";


          if (match) {
            visible++;
          }

        });


      const empty =
        document.getElementById(
          "glossaryEmpty"
        );


      if (empty) {

        empty.style.display =
          visible > 0
            ? "none"
            : "block";

      }

    }
  );

}


// =========================================================
// 14. NAVEGACIÓN RÁPIDA
// =========================================================

// Los botones con:
//
// data-target="quien"
// data-target="documentacion"
// etc.
//
// llevan directamente a la sección.


document
  .querySelectorAll("[data-target]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const targetId =
          button.dataset.target;


        const target =
          document.getElementById(
            targetId
          );


        if (!target) return;


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


// =========================================================
// 15. CERRAR ACORDEONES AL CAMBIAR DE SECCIÓN
// =========================================================

document
  .querySelectorAll(".accordion-group")
  .forEach((group) => {

    const buttons =
      group.querySelectorAll(
        ".accordion-btn"
      );


    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          buttons.forEach((other) => {

            if (other !== button) {

              other.classList.remove(
                "active"
              );


              const content =
                other.nextElementSibling;


              if (content) {

                content.classList.remove(
                  "open"
                );

              }

            }

          });

        }
      );

    });

  });


// =========================================================
// 16. ANIMACIÓN SUAVE PARA ENLACES INTERNOS
// =========================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


// =========================================================
// 17. INICIO DE LA PÁGINA
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateCheck();

    renderWiki();

  }
);


// =========================================================
// FIN DEL JAVASCRIPT
// =========================================================
