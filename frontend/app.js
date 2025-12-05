const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  cargarPacientes();
  cargarDoctores();
  cargarCitas();
});

/* ======================================================
   🔹 SECCIÓN PACIENTES
   ====================================================== */
const formPaciente = document.getElementById("formPaciente");
const pacienteId = document.getElementById("pacienteId");
const tablaPacientes = document.querySelector("#tablaPacientes tbody");

async function cargarPacientes() {
  try {
    const res = await fetch(`${API_URL}/pacientes`);
    const pacientes = await res.json();

    tablaPacientes.innerHTML = "";

    const selectPacientes = document.getElementById("citaPaciente");
    selectPacientes.innerHTML = `<option value="">Seleccione paciente</option>`;

    pacientes.forEach((p) => {
      tablaPacientes.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>${p.email}</td>
          <td>${p.telefono}</td>
          <td class="acciones">
            <button onclick="editarPaciente(${p.id}, '${p.nombre}', '${p.email}', '${p.telefono}')">Editar</button>
            <button class="danger" onclick="eliminarPaciente(${p.id})">Eliminar</button>
          </td>
        </tr>
      `;

      selectPacientes.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });
  } catch (err) {
    showAlert("Error cargando pacientes", "error");
  }
}

formPaciente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("pacienteNombre").value.trim(),
    email: document.getElementById("pacienteEmail").value.trim(),
    telefono: document.getElementById("pacienteTelefono").value.trim(),
  };

  if (!data.nombre || !data.email || !data.telefono)
    return showAlert("Todos los campos son obligatorios", "warning");

  try {
    let res;
    if (pacienteId.value) {
      res = await fetch(`${API_URL}/pacientes/${pacienteId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch(`${API_URL}/pacientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const json = await res.json();
    if (!res.ok) return showAlert(json.error || "Error guardando paciente");

    showAlert("Paciente guardado correctamente");
    formPaciente.reset();
    pacienteId.value = "";
    cargarPacientes();
  } catch (err) {
    showAlert("Error del servidor", "error");
  }
});

function editarPaciente(id, nombre, email, telefono) {
  pacienteId.value = id;
  document.getElementById("pacienteNombre").value = nombre;
  document.getElementById("pacienteEmail").value = email;
  document.getElementById("pacienteTelefono").value = telefono;
}

async function eliminarPaciente(id) {
  const c = await showConfirm("¿Eliminar este paciente?");
  if (!c) return;

  try {
    const res = await fetch(`${API_URL}/pacientes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return showAlert("Error eliminando paciente", "error");

    showAlert("Paciente eliminado", "success");
    cargarPacientes();
  } catch (err) {
    showAlert("Error del servidor", "error");
  }
}

/* ======================================================
   🔹 SECCIÓN DOCTORES
   ====================================================== */

const formDoctor = document.getElementById("formDoctor");
const doctorId = document.getElementById("doctorId");
const tablaDoctores = document.querySelector("#tablaDoctores tbody");

async function cargarDoctores() {
  try {
    const res = await fetch(`${API_URL}/doctores`);
    const doctores = await res.json();

    tablaDoctores.innerHTML = "";

    const selectDoctor = document.getElementById("citaDoctor");
    selectDoctor.innerHTML = `<option value="">Seleccione doctor</option>`;

    doctores.forEach((d) => {
      tablaDoctores.innerHTML += `
        <tr>
          <td>${d.id}</td>
          <td>${d.nombre}</td>
          <td>${d.especialidad}</td>
          <td class="acciones">
            <button onclick="editarDoctor(${d.id}, '${d.nombre}', '${d.especialidad}')">Editar</button>
            <button class="danger" onclick="eliminarDoctor(${d.id})">Eliminar</button>
          </td>
        </tr>
      `;

      selectDoctor.innerHTML += `<option value="${d.id}">${d.nombre}</option>`;
    });
  } catch (err) {
    showAlert("Error cargando doctores", "error");
  }
}

formDoctor.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("doctorNombre").value.trim(),
    especialidad: document.getElementById("doctorEspecialidad").value.trim(),
  };

  if (!data.nombre || !data.especialidad)
    return showAlert("Todos los campos son obligatorios", "warning");

  try {
    let res;

    if (doctorId.value) {
      res = await fetch(`${API_URL}/doctores/${doctorId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch(`${API_URL}/doctores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const json = await res.json();
    if (!res.ok) return showAlert(json.error || "Error procesando doctor");

    showAlert("Doctor guardado correctamente", "success");
    formDoctor.reset();
    doctorId.value = "";
    cargarDoctores();
  } catch (err) {
    showAlert("Error del servidor", "error");
  }
});

function editarDoctor(id, nombre, especialidad) {
  doctorId.value = id;
  document.getElementById("doctorNombre").value = nombre;
  document.getElementById("doctorEspecialidad").value = especialidad;
}

async function eliminarDoctor(id) {
  const c = await showConfirm("¿Eliminar este doctor?");
  if (!c) return;

  try {
    const res = await fetch(`${API_URL}/doctores/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return showAlert("Error eliminando doctor", "error");

    showAlert("Doctor eliminado", "success");
    cargarDoctores();
  } catch (err) {
    showAlert("Error del servidor", "error");
  }
}

/* ======================================================
   🔹 SECCIÓN CITAS
   ====================================================== */

const formCita = document.getElementById("formCita");
const tablaCitas = document.querySelector("#tablaCitas tbody");

async function cargarCitas() {
  try {
    const res = await fetch(`${API_URL}/citas`);
    const citas = await res.json();

    tablaCitas.innerHTML = "";

    citas.forEach((c) => {
      tablaCitas.innerHTML += `
        <tr>
          <td>${c.id}</td>
          <td>${c.Paciente ? c.Paciente.nombre : "N/A"}</td>
          <td>${c.Doctore ? c.Doctore.nombre : "N/A"}</td>
          <td>${c.fecha}</td>
          <td>${c.hora_inicio}</td>
          <td>${c.hora_fin}</td>
          <td class="acciones">
            <button class="danger" onclick="cancelarCita(${c.id})">Cancelar</button>
          </td>
        </tr>
      `;
    });
  } catch {
    showAlert("Error cargando citas", "error");
  }
}

formCita.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    paciente_id: document.getElementById("citaPaciente").value,
    doctor_id: document.getElementById("citaDoctor").value,
    fecha: document.getElementById("citaFecha").value,
    hora_inicio: document.getElementById("citaHoraInicio").value,
    hora_fin: document.getElementById("citaHoraFin").value,
  };

  if (!data.paciente_id || !data.doctor_id || !data.fecha || !data.hora_inicio || !data.hora_fin) {
    return showAlert("Todos los campos son obligatorios", "warning");
  }

  try {
    const res = await fetch(`${API_URL}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) return showAlert(json.error || "Error creando cita", "error");

    showAlert("Cita agendada correctamente");
    formCita.reset();
    cargarCitas();
  } catch {
    showAlert("Error del servidor", "error");
  }
});


async function cancelarCita(id) {
  const c = await showConfirm("¿Cancelar esta cita?");
  if (!c) return;

  try {
    const res = await fetch(`${API_URL}/citas/${id}`, { method: "DELETE" });

    if (!res.ok) return showAlert("Error cancelando cita", "error");

    showAlert("Cita cancelada correctamente");
    cargarCitas();
  } catch {
    showAlert("Error del servidor", "error");
  }
}

/* ======================================================
   🔹 ALERTAS Y CONFIRMACIONES
   ====================================================== */

function showAlert(message, type = "success") {
  const container = document.getElementById("alertContainer");
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;
  container.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "fadeOut 0.4s forwards";
    setTimeout(() => alert.remove(), 400);
  }, 3000);
}

function showConfirm(message) {
  return new Promise((resolve) => {
    const container = document.getElementById("alertContainer");

    const confirmBox = document.createElement("div");
    confirmBox.className = "alert confirm";
    confirmBox.innerHTML = `
      <span>${message}</span>
      <div class="confirm-buttons">
        <button class="secondary yes">Sí</button>
        <button class="danger no">No</button>
      </div>
    `;

    container.appendChild(confirmBox);

    confirmBox.querySelector(".yes").addEventListener("click", () => {
      confirmBox.remove();
      resolve(true);
    });
    confirmBox.querySelector(".no").addEventListener("click", () => {
      confirmBox.remove();
      resolve(false);
    });
  });
}
