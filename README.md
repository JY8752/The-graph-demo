# The-graph-demo
The graphのデモ。
[DigiDigaku](https://opensea.io/collection/digidaigaku)のサブグラフを作ってみる。

## install

the graph CLI tool install
```
npm install -g @graphprotocol/graph-cli
```

## init

```
//rehashしないとコマンドが反映されなかったので
nodenv rehash

graph init --from-contract 0xd1258DB6Ac08eB0e625B75b371C023dA478E94A9 --contract-name DigiDaigaku --index-events

```

## graph codegen

```
graph codegen
```

## authenticated

```
graph auth --product hosted-service <access token>
```

## deploy

```
graph deploy --product hosted-service jy8752/digidaigaku   
```