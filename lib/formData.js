module.exports = {
  ops: [
    {name: '中国之星'},
    {name: '金玉兰奖'}
  ],
  renderAge: () => {
    let age = [];
    for (let i=0;i<20;i++) {
      age.push({name: i+5, value: i+5})
    }
    return age;
  },
  type: [
    {name: '舞蹈'},
    {name: '声乐'},
    {name: '器乐'},
    {name: '表演'},
    {name: '语言'},
    {name: '书画'}
  ],
  groupType: [
    {name: '个人'},
    {name: '幼儿园'},
    {name: '学校'},
    {name: '培训机构'},
    {name: '其他'}
  ]
}