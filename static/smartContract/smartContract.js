'use strict'

var DictItem = function (config) {
  if (config) {
    var obj = JSON.parse(config)
    this.name = obj.name
    this.material = obj.material
    this.flavoring = obj.flavoring
    this.desc = obj.desc
  } else {
    this.name = ''
    this.material = ''
    this.flavoring = ''
    this.desc = ''
  }
}

DictItem.prototype = {
  toString: function () {
    return JSON.stringify(this)
  }
}

var BusinessCard = function () {
  LocalContractStorage.defineMapProperty(this, 'businessCard', {
    parse: function (config) {
      return new DictItem(config)
    },
    stringify: function (o) {
      return o.toString()
    }
  })
}

BusinessCard.prototype = {
  init: function () {

  },
  save: function (name, material, flavoring, desc) {
    // // 使用内置对象Blockchain获取提交内容的作者钱包地址
    var author = 'Blockchain'.transaction.from
    var dictItem = this.businessCard.get(name)
    if (dictItem) {
      throw new Error('此菜名已被注册')
    }

    dictItem = new DictItem()
    dictItem.author = author
    dictItem.name = name
    dictItem.material = material
    dictItem.flavoring = flavoring
    dictItem.desc = desc
    this.businessCard.put(name, dictItem)
  },
  get: function (name) {
    name = name.trim()
    if (name === '') {
      throw new Error('empty name')
    }
    return this.businessCard.get(name)
  }
}

module.exports = BusinessCard
