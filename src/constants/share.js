export const getShareMessage = ({ isCandidate, city, currentUrl }) =>
  isCandidate
    ? `Quer conhecer meus posicionamentos sobre saúde, segurança, economia e mais temas importantes para ${city}? Confere meu perfil no Vota Cidade: ${currentUrl}`
    : `Descobri no Vota Cidade qual candidato(a) a vereador(a) pensa mais parecido comigo! Quer encontrar quem melhor te representa? Acesse o site: ${currentUrl}`;
