describe("E2E - Sistema de Citas Médicas", () => {
  const apiUrl = "http://localhost:3000";

  let pacienteId;
  let doctorId;
  let citaId;

  it("Registrar paciente válido", () => {
    const nombre = `Paciente-${Date.now()}`;
    const email = `pruebagmail${Date.now()}@mail.com`;

    cy.request("POST", `${apiUrl}/pacientes`, {
      nombre,
      email,
      telefono: "3207203252",
    }).then((res) => {
      expect(res.status).to.eq(201);
      pacienteId = res.body.id;
    });
  });

  it("Validación de email inválido", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/pacientes`,
      body: {
        nombre: "Prueba",
        email: "correoinvalido",
        telefono: "123123",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("Registrar doctor válido", () => {
    const nombre = `Drprueba-${Date.now()}`;

    cy.request("POST", `${apiUrl}/doctores`, {
      nombre,
      especialidad: "Medicina General",
    }).then((res) => {
      expect(res.status).to.eq(201);
      doctorId = res.body.id;
    });
  });

  it("Crear cita válida", () => {
    const fecha = "2025-01-01";

    cy.request("POST", `${apiUrl}/citas`, {
      doctor_id: doctorId,
      paciente_id: pacienteId,
      fecha,
      hora_inicio: "10:00",
      hora_fin: "11:00",
    }).then((res) => {
      expect(res.status).to.eq(201);
      citaId = res.body.id;
    });
  });

  it("Intentar crear cita en horario ocupado", () => {
    const fecha = "2025-01-01";

    cy.request({
      method: "POST",
      url: `${apiUrl}/citas`,
      failOnStatusCode: false,
      body: {
        doctor_id: doctorId,
        paciente_id: pacienteId,
        fecha,
        hora_inicio: "10:30",
        hora_fin: "11:00",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.include("horario");
    });
  });

  it("Cancelar la cita creada", () => {
    cy.request({
      method: "DELETE",
      url: `${apiUrl}/citas/${citaId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 404]).to.include(res.status);
    });
  });
});
