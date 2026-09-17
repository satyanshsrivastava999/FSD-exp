import http from 'http'
const port=2000
const server=http.createServer((req,res)=>{
    res.end("hello");
})
server.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
