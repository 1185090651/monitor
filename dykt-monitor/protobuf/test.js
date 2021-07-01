const pb = require('./cls_pb.js')
const axios = require('axios')

// console.log(pb);
// console.log(pb.LogGroup);

const p = new pb.Log();

// 设置值
p.setContentsList({a: 1, b: 2})
p.setTime(new Date().getTime());

// 序列化后的值
var bytes = p.serializeBinary();

// 反序列化
var unBytes = pb.Log.deserializeBinary(bytes);

// 获取反序列化之后的值
var contentList = p.getContentsList();
console.log(p.getTime());

module.exports = bytes;


