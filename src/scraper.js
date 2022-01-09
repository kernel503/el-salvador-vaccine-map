/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// https://api-v2.vacunacioncovid19.gob.sv/establecimientos
// https://api-v2.vacunacioncovid19.gob.sv/departamentos
// https://api-v2.vacunacioncovid19.gob.sv/municipios

async function fetchDepartamentos() {
  const response = await fetch('https://api-v2.vacunacioncovid19.gob.sv/departamentos');
  const { datos } = await response.json();
  const departamentos = datos.reduce((acumm, { id, nombre }) => ({ ...acumm, [id]: nombre }), {});
  console.log(departamentos);
  return departamentos;
}

async function fetchEstablecimientos() {
  const departamentos = {
    1: 'Ahuachapán',
    2: 'Santa Ana',
    3: 'Sonsonate',
    4: 'Chalatenango',
    5: 'La Libertad',
    6: 'San Salvador',
    7: 'Cuscatlán',
    8: 'La Paz',
    9: 'Cabañas',
    10: 'San Vicente',
    11: 'Usulután',
    12: 'San Miguel',
    13: 'Morazán',
    14: 'La Unión',
  };
  const response = await fetch('https://api-v2.vacunacioncovid19.gob.sv/establecimientos');
  const { datos } = await response.json();
  const establecimientos = datos.map(({
    // eslint-disable-next-line camelcase
    id_departamento, nombre, direccion, latitud, longitud,
  }) => ({
    country: departamentos[id_departamento],
    name: nombre,
    address: direccion,
    location: { latitude: latitud, longitude: longitud },
  }));
  console.log(establecimientos);
  return establecimientos;
}

const agrupacion = establecimientos.reduce(((accum, { country, ...others }) => {
  accum[country] ||= [{ ...others }];
  accum[country] = [...accum[country], { ...others }];
  return accum;
}), {});
