import yaml
import datetime

# 解析YAML文件
with open('./_data/conferences.yml', 'rb') as f:
    confs = yaml.safe_load(f)

# 获取当前日期
now = datetime.datetime.now()

# 存储过去的会议和TBA的会议
past_deadlines = []
tba_deadlines = []

for conf in confs:
    # 检查会议的deadline是否为TBA
    if conf['deadline'].lower() == 'tba':
        tba_deadlines.append(conf['title'])
    else:
        # 将字符串转换为datetime对象
        deadline = datetime.datetime.strptime(conf['deadline'], '%Y-%m-%d %H:%M:%S')
        # 检查当前日期是否已经超过deadline
        if now > deadline:
            past_deadlines.append((conf['title'], deadline))

# 根据截止日期对过去的会议进行排序，距离当前时间越远的排在前面
past_deadlines.sort(key=lambda x: x[1], reverse=False)

print("已过去的会议有:")
for title, deadline in past_deadlines:
    print(f"{title}, 截止日期: {deadline}")

print(f"待确定的会议有: {tba_deadlines}")