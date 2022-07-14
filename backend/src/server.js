import app from './app';

try {
  app.listen(process.env.PORT || 4444)
  console.log('listening on:', process.env.PORT)
} catch (error) {
  console.log(error)
}
