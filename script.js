// Este archivo script.js contiene todos los ramos de la malla con sus prerrequisitos

const malla = document.getElementById("malla");
const progresoBarra = document.getElementById("progreso");

const ramos = [
  // Nivel 1
  { nombre: "Cálculo I", nivel: 1 },
  { nombre: "Álgebra I", nivel: 1 },
  { nombre: "Física I", nivel: 1 },
  { nombre: "Introducción al diseño en ingeniería", nivel: 1 },
  { nombre: "Introducción a la ingeniería industrial", nivel: 1 },

  // Nivel 2
  { nombre: "Cálculo II", nivel: 2, prereqs: ["Cálculo I"] },
  { nombre: "Álgebra II", nivel: 2, prereqs: ["Álgebra I"] },
  { nombre: "Física II", nivel: 2, prereqs: ["Física I"] },
  { nombre: "Fundamentos de programación", nivel: 2, prereqs: ["Introducción al diseño en ingeniería"] },
  { nombre: "Química general y termodinámica", nivel: 2 },

  // Nivel 3
  { nombre: "Inglés I", nivel: 3 },
  { nombre: "Cálculo III", nivel: 3, prereqs: ["Cálculo II"] },
  { nombre: "Ecuaciones diferenciales", nivel: 3, prereqs: ["Cálculo II", "Álgebra II"] },
  { nombre: "Fundamentos de economía", nivel: 3, prereqs: ["Cálculo I"] },
  { nombre: "Programación", nivel: 3, prereqs: ["Fundamentos de programación"] },
  { nombre: "Física moderna", nivel: 3, prereqs: ["Física II"] },

  // Nivel 4
  { nombre: "Inglés II", nivel: 4, prereqs: ["Inglés I"] },
  { nombre: "Taller de diseño en ingeniería", nivel: 4, prereqs: ["Fundamentos de economía"] },
  { nombre: "Análisis estadístico", nivel: 4, prereqs: ["Cálculo II"] },
  { nombre: "Métodos numéricos", nivel: 4, prereqs: ["Cálculo III", "Ecuaciones diferenciales"] },
  { nombre: "Ingeniería de sistemas", nivel: 4, prereqs: ["Ecuaciones diferenciales", "Química general y termodinámica"] },
  { nombre: "Diseño digital y computacional", nivel: 4, prereqs: ["Programación"] },

  // Nivel 5
  { nombre: "Inglés III", nivel: 5, prereqs: ["Inglés II"] },
  { nombre: "Estadística aplicada", nivel: 5, prereqs: ["Análisis estadístico"] },
  { nombre: "Operaciones y procesos industriales", nivel: 5, prereqs: ["Química general y termodinámica", "Física moderna"] },
  { nombre: "Administración", nivel: 5, prereqs: ["Ingeniería de sistemas"] },
  { nombre: "Microeconomía", nivel: 5, prereqs: ["Fundamentos de economía"] },
  { nombre: "Taller de gestión y liderazgo", nivel: 5, prereqs: ["Ingeniería de sistemas"] },

  // Nivel 6
  { nombre: "Inglés IV", nivel: 6, prereqs: ["Inglés III"] },
  { nombre: "Macroeconomía", nivel: 6, prereqs: ["Microeconomía"] },
  { nombre: "Contabilidad y costos", nivel: 6, prereqs: ["Administración"] },
  { nombre: "Investigación de operaciones", nivel: 6, prereqs: ["Cálculo III", "Álgebra II"] },
  { nombre: "Tecnologías para la gestión", nivel: 6, prereqs: ["Diseño digital y computacional"] },
  { nombre: "Introducción a la innovación", nivel: 6, prereqs: ["Taller de diseño en ingeniería"] },

  // Nivel 7
  { nombre: "Diseño de productos y sistemas productivos", nivel: 7, prereqs: ["Operaciones y procesos industriales"] },
  { nombre: "Marketing estratégico", nivel: 7, prereqs: ["Estadística aplicada", "Administración"] },
  { nombre: "Modelos estocásticos", nivel: 7, prereqs: ["Estadística aplicada", "Investigación de operaciones"] },
  { nombre: "Finanzas", nivel: 7, prereqs: ["Contabilidad y costos"] },
  { nombre: "Gestión de emprendimiento", nivel: 7, prereqs: ["Taller de gestión y liderazgo", "Introducción a la innovación"] },

  // Nivel 8
  { nombre: "Sistemas de información", nivel: 8, prereqs: ["Microeconomía", "Macroeconomía"] },
  { nombre: "Análisis de decisiones", nivel: 8, prereqs: ["Modelos estocásticos"] },
  { nombre: "Modelamiento de sistemas complejos", nivel: 8, prereqs: ["Modelos estocásticos"] },
  { nombre: "Inteligencia de negocios", nivel: 8, prereqs: ["Tecnologías para la gestión", "Marketing estratégico"] },
  { nombre: "Evaluación de proyectos", nivel: 8, prereqs: ["Finanzas"] },

  // Nivel 9
  { nombre: "Tópico de especialidad I", nivel: 9, prereqs: ["Análisis de decisiones", "Evaluación de proyectos"] },
  { nombre: "Gestión de personas", nivel: 9, prereqs: ["Gestión de emprendimiento"] },
  { nombre: "Gestión estratégica", nivel: 9, prereqs: ["Marketing estratégico", "Finanzas"] },
  { nombre: "Electivo I", nivel: 9, prereqs: ["Sistemas de información", "Evaluación de proyectos"] },
  { nombre: "Gestión de producción de bienes y servicios", nivel: 9, prereqs: ["Diseño de productos y sistemas productivos", "Investigación de operaciones"] },

  // Nivel 10
  { nombre: "Tópico de especialidad II", nivel: 10, prereqs: ["Tópico de especialidad I"] },
  { nombre: "Proyecto de ingeniería", nivel: 10, prereqs: ["Tópico de especialidad I", "Gestión de personas", "Gestión estratégica", "Electivo I", "Gestión de producción de bienes y servicios"] },
  { nombre: "Gestión de cadena de suministro", nivel: 10, prereqs: ["Sistemas de información", "Gestión de producción de bienes y servicios"] },
  { nombre: "Tópico de especialidad III", nivel: 10, prereqs: ["Electivo I"] },
  { nombre: "Electivo II", nivel: 10, prereqs: ["Electivo I"] },

  // Nivel 11
  { nombre: "Trabajo de titulación", nivel: 11, prereqs: ["Tópico de especialidad II", "Proyecto de ingeniería", "Gestión de cadena de suministro", "Tópico de especialidad III", "Electivo II"] }
];

let estado = JSON.parse(localStorage.getItem("progresoMalla")) || {};

function guardar() {
  localStorage.setItem("progresoMalla", JSON.stringify(estado));
}

function calcularProgreso() {
  const total = ramos.length;
  const completados = Object.values(estado).filter(Boolean).length;
  const porcentaje = (completados / total) * 100;
  progresoBarra.style.width = `${porcentaje}%`;
}

function cumplePrereqs(ramo) {
  if (!ramo.prereqs) return true;
  return ramo.prereqs.every(req => estado[req]);
}

function renderizar() {
  malla.innerHTML = "";
  const niveles = [...new Set(ramos.map(r => r.nivel))];

  niveles.forEach(nivel => {
    const divNivel = document.createElement("div");
    divNivel.classList.add("nivel");

    const titulo = document.createElement("h3");
    titulo.textContent = `Nivel ${nivel}`;
    divNivel.appendChild(titulo);

    ramos.filter(r => r.nivel === nivel).forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.textContent = ramo.nombre;

      const aprobado = estado[ramo.nombre];
      const habilitado = cumplePrereqs(ramo);

      if (aprobado) {
        div.classList.add("aprobado");
      } else if (!habilitado) {
        div.classList.add("bloqueado");
        div.title = `Requiere: ${ramo.prereqs.join(", ")}`;
      } else {
        div.classList.add("desbloqueado");
      }

      if (habilitado) {
        div.onclick = () => {
          estado[ramo.nombre] = !estado[ramo.nombre];
          guardar();
          renderizar();
        };
      }

      divNivel.appendChild(div);
    });

    malla.appendChild(divNivel);
  });

  calcularProgreso();
}

document.getElementById("reiniciar").onclick = () => {
  if (confirm("¿Estás segura de reiniciar tu malla?")) {
    estado = {};
    guardar();
    renderizar();
  }
};

renderizar();
