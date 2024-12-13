import createTransporter from "../libs/mailer.js";

export async function sendMail(businessData) {
  const transporter = await createTransporter();

  const htmlContent = `
    <h1>Nuevo Negocio Registrado</h1>
    <p><strong>Nombre Fantasía:</strong> ${businessData.fantasyName}</p>
    <p><strong>Categoría:</strong> ${businessData.category}</p>
    <p><strong>Subcategoría:</strong> ${businessData.subcategory}</p>
    <p><strong>Descripción:</strong> ${businessData.description}</p>
    <p><strong>Horario:</strong> ${businessData.schedule}</p>
    <p><strong>Teléfono:</strong> ${businessData.phone}</p>
    ${businessData.web ? `<p><strong>Web:</strong> ${businessData.web}</p>` : ''}
    ${businessData.instagram ? `<p><strong>Instagram:</strong> ${businessData.instagram}</p>` : ''}
    <hr />
    <h2>Detalles Adicionales:</h2>
    <p><strong>Métodos de Pago:</strong> ${JSON.stringify(businessData.paymentMethods)}</p>
    <p><strong>General:</strong> ${JSON.stringify(businessData.general)}</p>
    <p><strong>Accesibilidad:</strong> ${JSON.stringify(businessData.accessibility)}</p>
    <p><strong>Gastronomía:</strong> ${JSON.stringify(businessData.gastronomy)}</p>
    <p><strong>Conectividad:</strong> ${JSON.stringify(businessData.connectivity)}</p>
    <p><strong>Adicionales:</strong> ${JSON.stringify(businessData.additional)}</p>
    <p><strong>Ubicación:</strong> ${JSON.stringify(businessData.location)}</p>
    <p><strong>Foto de Portada:</strong> ${businessData.coverPhoto}</p>
    <p><strong>Galería:</strong> ${JSON.stringify(businessData.gallery)}</p>
  `;

  const mailOptions = {
    from: process.env.NODEMAILER_FROM,
    // to: 'ajroncoroni@gesell.com.ar', // Destinatario
    to: process.env.NODEMAILER_TO, // Destinatario
    subject: 'Nuevo negocio registrado',
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}
