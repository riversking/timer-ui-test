export default (file) => () => import(`@/components/${file}.vue`)
