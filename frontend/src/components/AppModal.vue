<template>
    <div class="all">
        <button @click="open()">모달창띄우기</button>
        <button @click="open()">브랜치테스트(진지)</button>
        <button @click="open()">테스트3브랜치입니다.</button>

        <div id="modal" class="modal-overlay">
            <div class="modal-window">
                <div class="close-area" @click="close()">X</div>
                <div class="content">
                    <!-- 제목 -->
                    <div class="inputwrap">
                        <textarea type="text" class="subject" v-model="subject" ref="subject"
                            placeholder="질문을 입력해주세요.(최대200자)" @keyup="fnSubject()"></textarea>
                    </div>
                    <!-- 하나만/중복선택 -->
                    <div class="type">
                        <input type="radio" v-model="picked" value="1" ref="1" @click="CheckTest">하나만 선택
                        <input type="radio" v-model="picked" value="2" ref="2" @click="CheckTest">중복 선택 가능
                    </div>
                    <!-- 질문 리스트 -->
                    <div class="contents">
                        <div v-for="(value, index) in count" v-bind:key="index" class="count">
                            <div class="contentList">
                                <input type="text" class="mdl-textfield__input" :placeholder="index + 1 + '. 입력하세요'"
                                    ref="cont" v-model="contList[index]" />
                            </div>
                        </div>
                    </div>
                    <!-- 선택지개수는 dd입니다. -->
                    <div class="spanSec">
                        <span>선택지 개수는 {{ count }} 입니다.</span>
                    </div>
                    <!-- count올리고내리기 -->
                    <div class="countBtn">
                        <button @click="countDown()" class="btnCount">- 선택지 줄이기</button>
                        <button @click="countUp()" class="btnCount">+ 선택지 늘리기</button>
                    </div>
                    <!-- 제출버튼 -->
                    <div class="btnSec">
                        <button class="common-button" @click="fnAddProc">만들기</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import instance from './common/api/interceptor'

export default {
    name: '2AppModal',

    data() {
        return {
            count: 2,
            board_code: 'news',
            subject: '',
            cont: '',
            id: 'admin',
            form: '', //form 전송 데이터
            picked: '1',
            contList: [null, null],
        };
    },

    mounted() {
        this.fnMounted()
    },

    methods: {


        CheckTest(event) {
            console.log(event.target)
            var selected = event.target.value;
            console.log('selected:', selected);
        },
        fnSubject() {
            if (this.subject.length > 200) {
                alert('200자이내로 입력해주세요.')
                return false;
            } return true;

        },
        contSubmit() {
            for (var i = 0; i < this.count; i++) {
                if (!this.contList[i]) {
                    alert('선택지 내용을 입력해주세요.');
                    break;
                }
            }
        },
        contCheck() {
            let contList2 = [...new Set(this.contList)]
            if (contList2.length < this.count) {
                alert('서로다른 선택지를 입력해주세요.')
                return false;
            } return true;
        },
        subjectSubmit() {
            if (!this.subject) {
                alert('질문을 입력해주세요.');
                return false;
            }
        },


        allSubmit() {
            for (var i = 0; i < this.count; i++) {
                if (!this.contList[i]) {
                    this.contSubmit();
                    return false;
                }
            } if (!this.subject) {
                this.subjectSubmit();
                return false;
            } return true;
        },

        countUp() {
            if (this.count < 5) {
                this.count++;
                this.contList.push(null);
            } else {
                alert('선택지는 최대 5개입니다.');
            }
        },
        countDown() {
            if (this.count > 2) {
                this.count--;
                this.contList.pop(null);
            } else {
                alert('선택지는 최소 2개입니다.');
            }
        },
        close() {
            const modal = document.getElementById('modal')
            modal.style.display = 'none';
        },
        open() {
            const modal = document.getElementById('modal')
            modal.style.display = 'flex';
        },
        fnMounted() {
            //const accessToken = this.$cookies.get(accessToken);
            const accessToken = Vue.$cookies.get('accessToken', accessToken)
            const refreshToken = Vue.$cookies.get('refreshToken', refreshToken)

            //const refreshToken = this.$cookies.get(refreshToken);
            console.log('accessToken', accessToken)
            console.log('refreshToken', refreshToken)
            if (refreshToken == null) {
                alert('세션이 만료되어 로그아웃합니다.')
                localStorage.removeItem('email'),
                    localStorage.removeItem('password')
                localStorage.removeItem('voteYN')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('userId')
                this.$store.commit('currentUser', null)
                this.$store.commit('currentToken', null)
                this.$store.commit('currentRefresh', null)
                this.$cookies.remove("accessToken");
                this.$cookies.remove("refreshToken");
                this.$cookies.remove("userId");
                this.$router.push('/')
            }

        },
        dicObject() {
            var dicObject = {};
            for (var i = 0; i < this.count; i++) {
                dicObject[this.contList[i]] = 0;
            }
            console.log(dicObject);

            return dicObject;
        },
        fnAddProc() {
            if (!this.fnSubject()) return;
            if (!this.allSubmit()) return;
            if (!this.contCheck()) return;
            this.form = {
                board_code: this.board_code,
                subject: this.subject,
                id: this.id,
                checkyn: this.picked,
                cont: JSON.stringify(this.dicObject())
            }
            console.log(this.form)

            instance.post('http://192.168.0.89:3000/api/board', this.form)
                .then((res) => {
                    if (res.data.success) {
                        alert('등록되었습니다.')
                        this.fnVote();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        fnVote() {
            //이전투표목록 화면으로 이동 함수
            this.$router.push({ path: '/common/AppBefore', query: this.body });
        },
    },
};
</script>

<style  scoped>
.contents {
    overflow: auto;
    height: 120px;
}

.inputwrap {
    width: 100%;
}

.subject {
    height: 50px;
    margin-top: 20px;
    border-radius: 6px;
    padding: 20px;

    width: 70%;

}

.subject::placeholder {
    color: lightslategray;
    padding-top: 14px;
}

.countBtn {
    border: 1px solid grey;
    padding: 6px 6px 10px 10px;
    margin-left: 50px;
    margin-bottom: 20px;
    border-radius: 4px;
    width: 70%;


}

.btnCount {
    border: none;
    background-color: transparent;

}

.content {
    height: 450px;

}

.mdl-textfield__input {
    height: 8px;
    padding: 20px;
    width: 70%;
    border-radius: 6px;
    border: 1px solid grey;

}

.count {
    padding: 4px;
}

.type {
    padding: 10px;
}

.spanSec {
    padding: 10px;
}




.all {
    padding: 0;
    margin: 0;

}

#modal.modal-overlay {

    z-index: 10;
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(1.5px);
    -webkit-backdrop-filter: blur(1.5px);

}

#modal .modal-window {
    background: white;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(13.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 400px;
    height: 500px;
    position: relative;
    padding: 10px;
}

#modal .title {
    padding-left: 10px;
    display: inline;
    color: rgb(0, 0, 0);

}

#modal .title h2 {
    display: inline;
}

#modal .close-area {
    display: inline;
    float: right;
    padding-right: 10px;
    cursor: pointer;
    color: rgb(0, 0, 0);
}

#modal .content {
    margin-top: 20px;
    padding: 0px 10px;
    color: rgb(0, 0, 0);
}
</style>