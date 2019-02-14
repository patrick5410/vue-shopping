package com.tdxiov.wx_shopping.dao;

import com.tdxiov.wx_shopping.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao {
    @Autowired
    protected JdbcTemplate jdbcTemplate;


    /**
     * 添加用户
     * @param user
     * @return
     */
    public int insert(User user){
        System.out.println(user);
        return jdbcTemplate.update(
                "INSERT INTO WX_USER (PHONE,OPENID,SEX,NICKNAME,HEADIMGURL,COUNTRY,PROVINCE) VALUES(?,?,?,?,?,?,?)"
                ,user.getPhone(),user.getOpenid(),user.getSex(),user.getNickname(),user.getHeadimgurl(),user.getCountry(),user.getProvince());
    }

    /**
     * 修改用户信息
     * @param user
     * @return
     */
    public int update(User user){
        return jdbcTemplate.update(
                "UPDATE WX_USER SET PHONE=?,CREDIT_SCORE=?,OPENID=?,SEX=?,NICKNAME=?,HEADIMGURL=?,COUNTRY=?,PROVINCE=? WHERE ID=?"
                ,user.getPhone(),user.getCreditScore(),user.getOpenid(),user.getSex(),user.getNickname(),user.getHeadimgurl(),user.getCountry(),user.getProvince(),user.getId());
    }

    /**
     * 根据openid获取用户信息
     * @param openId
     * @return
     */
    public User selectByOpenId(String openId){
        List<User> list = jdbcTemplate.query("SELECT*FROM WX_USER WHERE openid=?",new BeanPropertyRowMapper(User.class),openId);
        if(list.isEmpty()){
            return null;
        }else {
            return list.get(0);
        }
    }


    /**
     * 根据用户id获取用户信息
     * @param userId
     * @return
     */
    public User selectById(Integer userId){
        List<User> list = jdbcTemplate.query("SELECT*FROM WX_USER WHERE ID=?",new BeanPropertyRowMapper(User.class),userId);
        if(list.isEmpty()){
            return null;
        }else {
            return list.get(0);
        }
    }

    /**
     * 获取所有的用户
     * @return
     */
    public List<User> selectAll(){
        return jdbcTemplate.query("SELECT*FROM WX_USER",new BeanPropertyRowMapper(User.class));
    }




}
