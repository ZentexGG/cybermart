﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace DataLayer.Entities;

public class User
{
    [Key]
    public int ID { get; set; }
    
    public IdentityUser IdentityUser { get; set; }
    public string IdentityUserId { get; set; }
    
    [Required(ErrorMessage = "Username is required")]
    public string? Username { get; set; }
    
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }
    [JsonIgnore]
    public UserPhoto? UserPhoto { get; set; }
    [JsonIgnore]
    public List<Order> Orders { get; set; }
}

