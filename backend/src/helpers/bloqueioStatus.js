export function calculateStatus(bloqueio) {
  if (bloqueio.status !== 'ativo') {
    return bloqueio.status;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(bloqueio.data_termino);
  endDate.setHours(0, 0, 0, 0);

  return endDate < today ? 'concluido' : 'ativo';
}

export function addCalculatedStatus(bloqueios) {
  const isArray = Array.isArray(bloqueios);
  const list = isArray ? bloqueios : [bloqueios];

  const result = list.map(bloqueio => {
    const bloqueioData = bloqueio.toJSON ? bloqueio.toJSON() : bloqueio;
    const calculatedStatus = calculateStatus(bloqueioData);

    return {
      ...bloqueioData,
      status_calculado: calculatedStatus,
      esta_ativo: calculatedStatus === 'ativo'
    };
  });

  return isArray ? result : result[0];
}
