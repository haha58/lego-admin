mongo -- "lego-template-detail" <<EOF
db = db.getSiblingDB('admin')
db.auth('root', '123456')
db = db.getSiblingDB('lego-template-detail')
db.auth('admin', '123456')
EOF
