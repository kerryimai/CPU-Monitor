const fetchCPUFromServer = () =>
  fetch("http://localhost:8080/load-average").then(res => res.json());

export const fetchCPUs = () =>
  fetch("http://localhost:8080/cpus").then(res => res.json());

export default fetchCPUFromServer;
