import http from '/@/utils/http';

// test
export function find(){
  return  http({
    method: 'get',
    url: 'http://localhost:3000/home',
  })
}