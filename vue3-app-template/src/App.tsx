import { RouterLink, RouterView } from 'vue-router'
export default () => {
  return <div>
    <p>
      <RouterLink to="/page">page</RouterLink>
    </p>
    <RouterView />
  </div>
}