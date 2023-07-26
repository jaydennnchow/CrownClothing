import { initializeApp } from "firebase/app";
import {
  getAuth,   // 用来 create auth instance
  signInWithPopup,  // 创建 Google登录，弹出窗口 登录
  signInWithRedirect,   // 创建 Google登录，重定向 登录
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,   // 获取 数据库 实例
  doc,   // 获取 document 实例
  getDoc,  // 存入 data
  setDoc,   // 获取 data
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'


// Your web app's Firebase configuration（在 Firebase 注册的 web APP，自动生成的 唯一的配置信息）
const firebaseConfig = {
  apiKey: "AIzaSyCz5RDOZc2ari6fNxcs1QxCpQFY6acj2Tg",
  authDomain: "crwn-clothing-db-63dd1.firebaseapp.com",
  projectId: "crwn-clothing-db-63dd1",
  storageBucket: "crwn-clothing-db-63dd1.appspot.com",
  messagingSenderId: "574124935218",
  appId: "1:574124935218:web:fdd38b4462e886420c942b"
};

// Initialize Firebase
// 根据 配置信息，实例化 firebase（所有跟 firebase 相关的操作，都需要 使用此对象）
const firebaseApp = initializeApp(firebaseConfig);

// 使用 Google账号登录
// 可以使用其他方式登录，如使用 Facebook账号：const facebookProvider = new FacebookAuthProvider() 
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  // 设置 身份验证流程 中的 提示类型
  /**
   * select_account: 
   *    如果用户已经登录，则询问用户是否要继续使用已登录的帐户进行身份验证。
   *    如果没有已登录用户，或者用户要求使用其他帐户进行身份验证，则可以选择其他帐户或者登录新帐户。
   */
  prompt: 'select_account'
})

export const auth = getAuth()
/**
 * 提供一个 弹出Google登录窗口 的 方法
 * 2 arguments: auth, xxxProvider
 */
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
/**
 * 提供一个 重定向Google登录 的 方法
 * 参数：同上
 */
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// 获取的 数据库 实例，可用于 操作数据库
export const db = getFirestore()

/**
 * 判断数据库中是否 存在该用户，
 * 有，则不创建用户，return一个 userDocRef
 * 没有，则创建用户数据，并保存到数据库，最后return一个 userDocRef
 */
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return
  /**
   * 3 arguments: database, collection, document ID (unique id)
   * 返回的 userDocRef 是 document的引用对象
   * 注意：即使 database没有这个document，Google仍然会 返回此对象
   */
  const userDocRef = doc(db, 'users', userAuth.uid)

  /**
   * userSnapShot 可以 check whether or not this document exists 和 access the data
   */
  const userSnapShot = await getDoc(userDocRef)
  // console.log(userSnapShot.exists());   check whether or not the data exists

  // if user not exists, create a new user in the db
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // set user's data to document in the database
      // 2 arguments: document reference object, user's data( object )
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if user exists, return the userDocRef
  return userDocRef
}

// 通过 “邮箱+密码” 注册
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

// 通过 “邮箱+密码” 登录
export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return
  return await signInWithEmailAndPassword(auth,email,password)
}

// 退出登录
export const signOutUser = async () => await signOut(auth)

// 身份验证监听器函数，用于监听用户身份验证状态的更改
/**
 * 当用户的身份验证状态发生变化时，包括用户登录或登出操作，
 * onAuthStateChanged() 会被触发并执行相应的回调函数。
 * 
 * 2 parameters: auth, callback
 */
export const onAuthStateChangedListener = (callbak) => onAuthStateChanged(auth,callbak)

// 在 数据库 中，创建 collection 和 批量添加 documents
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db,collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach(obejct => {
    const docRef = doc(collectionRef,obejct.title.toLowerCase())
    batch.set(docRef,obejct)
  })

  await batch.commit()
  console.log('done');
}

// 获取 categories collection 下的 所有数据
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db,'categories')
  // 创建了一个 查询对象，用于获取集合中的文档。
  const q = query(collectionRef)

  // 执行查询
  const querySnapShot = await getDocs(q)
  // 对查询结果的文档进行遍历，逐个处理文档
  // 对每个文档，从其数据（curr.data()）中解构出 title 和 items 字段的值。
  // 将 title 字段转换为小写，作为类别映射对象 categoryMap 的键，items 作为对应键的值。
  const categoryMap = querySnapShot.docs.reduce((prev,curr)=>{
    const {title,items} = curr.data()
    prev[title.toLowerCase()] = items
    return prev
  },{})

  return categoryMap
}

export const getCategoriesAndDocuments2 = async () => {
  const collectionRef = collection(db,'categories')
  // await Promise.reject(new Error('I made an error hahaha'))
  const querySnapShot = await getDocs(collectionRef)
  // const categoryMap = {}
  const categoriesArray = querySnapShot.docs.map(doc => {
    // console.log(doc.data())
    return doc.data()
  })
  return categoriesArray
  // querySnapShot.forEach(doc => {
  //   // console.log(doc.id, '=>',doc.data());
  //   const {title,items} = doc.data()
  //   categoryMap[title.toLowerCase()] = items
  // })
  // return categoryMap
}