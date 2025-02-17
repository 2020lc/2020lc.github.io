# ssh

## 管理多个密匙

> 操作都在根目录目录下  
> 进入根目录：cd ~

### step1：生成自定义命名密匙

```javascript
ssh-keygen -t rsa -b 4096 -C "you@email"
```

第一次为询问你 rsa 命令，默认 id_rsa, 此时可更改 id_rsa_xxx

### step2：新建 config 文件管理 ssh

```text

# github.com
Host github.com
    HostName github.com
    Port 443
    IdentityFile ~/.ssh/id_rsa_xxx

# server2
Host server2.com
    HostName server2.com
    IdentityFile ~/.ssh/id_rsa_xxx2
```

### step3：启动 ssh agent, 添加 ssh

```javascript
eval "$(ssh-agent) -s"
// 添加你刚刚创建的密匙
ssh-add ~/.ssh/id_rsa_xxx
ssh-add ~/.ssh/id_rsa_xxx2
...
// 查看是否添加成功
ssh-add -l
```

### step4：开启进程自动启动 ssh agent

```javascript
// 创建.bashrc 或者 .bashrc_profile 添加内容
eval "$(ssh-agent) -s"
ssh-add ~/.ssh/id_rsa_xxx
ssh-add ~/.ssh/id_rsa_xxx2
...
```

### step5：测试

```javascript
ssh -T git@github.com
```

## QA

**Q1: 执行完 ssh-keygen 后没有生成.ssh 文件**

```javascript
// 指定目录
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_xx -C "you@email"
```
