const devApi = "http://localhost:8000/v1";
const prodApi = "https://space-n-time.herokuapp.com/v1";

const baseUrl = process.env.REACT_APP_STAGE === "prod" ? prodApi : devApi;

const config = {
  mapboxAPI:
    "pk.eyJ1IjoicGFyYXoiLCJhIjoiY2psOXQ1Z3Y3MHF1ZTNycGRhdXo4amtjbCJ9.0OK1sq_I9rnJhibgwMu7xw",
  googleClientId:
    "135024769582-jilp38tvekqnt0l92p955o3h2856u2re.apps.googleusercontent.com",
  baseUrl: baseUrl
};

export default config;
